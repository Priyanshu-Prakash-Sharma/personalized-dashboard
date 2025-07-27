import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';

// --- Types ---
interface ApiArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
}
interface ApiMovie {
  imdbID: string;
  Title: string;
  Plot: string;
  Poster: string;
  Response: string;
}
interface ContentItem {
  id: string;
  category: 'technology' | 'sports' | 'entertainment' | 'movies';
  title: string;
  description: string | null;
  imageUrl: string | null;
  url: string;
}
interface ContentState {
  items: ContentItem[];
  favorites: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  canLoadMore: boolean;
}

const initialState: ContentState = {
  items: [],
  favorites: [],
  status: 'idle',
  error: null,
  page: 1,
  canLoadMore: true,
};

const fetchCategories = ['technology', 'movies', 'sports', 'entertainment'];

export const fetchContent = createAsyncThunk<ContentItem[], number>('content/fetchContent', async (page) => {
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    let fetchedItems: ContentItem[] = [];
    const categoryIndex = (page - 1) % fetchCategories.length;
    const currentCategory = fetchCategories[categoryIndex];

    try {
        if (currentCategory === 'movies') {
            const movieIds = ['tt1375666', 'tt0816692', 'tt0137523', 'tt0133093'];
            const moviePromises = movieIds.map(id =>
                fetch(`https://www.omdbapi.com/?i=${id}&apikey=${omdbApiKey}`).then(res => res.json())
            );
            const movieData: ApiMovie[] = await Promise.all(moviePromises);
            fetchedItems = movieData
                .filter(movie => movie.Response === 'True')
                .map((movie: ApiMovie) => ({
                    id: `movie-${movie.imdbID}`, category: 'movies', title: movie.Title, description: movie.Plot, imageUrl: movie.Poster, url: `https://www.imdb.com/title/${movie.imdbID}/`,
                }));
        } else {
            const newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${currentCategory}&pageSize=8&apiKey=${newsApiKey}`);
            const newsData = await newsResponse.json();
            if (newsData.status === 'ok' && Array.isArray(newsData.articles)) {
                fetchedItems = newsData.articles.map((article: ApiArticle) => ({
                    id: article.url, category: currentCategory as ContentItem['category'], title: article.title, description: article.description, imageUrl: article.urlToImage, url: article.url,
                }));
            } else {
                console.error("NewsAPI Error:", newsData.message);
                fetchedItems = [];
            }
        }
    } catch (error) {
        console.error("Failed to fetch content:", error);
        return [];
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    return fetchedItems;
});

const contentSlice = createSlice({
  name: 'ContentSlice',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
        const id = action.payload;
        if (state.favorites.includes(id)) {
            state.favorites = state.favorites.filter(favId => favId !== id);
        } else {
            state.favorites.push(id);
        }
    },
    reorderItems: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
        const { activeId, overId } = action.payload;
        const oldIndex = state.items.findIndex((item) => item.id === activeId);
        const newIndex = state.items.findIndex((item) => item.id === overId);
        if (oldIndex !== -1 && newIndex !== -1) {
            state.items = arrayMove(state.items, oldIndex, newIndex);
        }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchContent.pending, (state) => { state.status = 'loading'; })
        .addCase(fetchContent.fulfilled, (state, action) => {
            if (action.payload.length === 0) {
                state.canLoadMore = false;
            } else {
                const existingIds = new Set(state.items.map(item => item.id));
                const uniqueNewItems = action.payload.filter(item => !existingIds.has(item.id));
                state.items.push(...uniqueNewItems);
                state.page += 1;
            }
            state.status = 'succeeded';
        })
        .addCase(fetchContent.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch content';
            state.canLoadMore = false;
        });
  },
});

export const { toggleFavorite, reorderItems } = contentSlice.actions;
export default contentSlice.reducer;