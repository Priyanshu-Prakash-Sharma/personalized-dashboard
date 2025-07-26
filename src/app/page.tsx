'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Corrected import path for ContentSlice
import { fetchContent, reorderItems } from '@/store/features/ContentSlice';
import { RootState, AppDispatch } from '@/store/store';
import ContentCard from '@/components/ContentCard';
// Corrected import path for CardSkeleton
import CardSkeleton from '@/components/CardSkelton';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { items, favorites, status, page, error } = useSelector((state: RootState) => state.content);
  const { selectedCategories } = useSelector((state: RootState) => state.preferences);
  const { searchTerm } = useSelector((state: RootState) => state.ui);

  // Effect for the very first data load
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContent(1));
    }
  }, [dispatch, status]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(reorderItems({ activeId: active.id as string, overId: over.id as string }));
    }
  };

  // The search and preference filtering logic
  const filteredContent = items
    .filter(item => selectedCategories.includes(item.category))
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (status === 'loading' && items.length === 0) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Unified Feed</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
        </div>
    );
  }

  if (status === 'failed') {
      return <div className="text-center py-12 text-red-500"><h2 className="text-xl font-bold">Failed to Load Content</h2><p>{error}</p></div>
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Unified Feed</h1>
        <SortableContext items={filteredContent.map(item => item.id)} strategy={rectSwappingStrategy}>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <ContentCard key={item.id} {...item} isFavorite={favorites.includes(item.id)} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8 col-span-full">No content found for your selected filters.</p>
            )}
          </motion.div>
        </SortableContext>
        
        {status !== 'loading' && <p className="text-center text-gray-500 my-8">End of content.</p>}
      </div>
    </DndContext>
  );
}