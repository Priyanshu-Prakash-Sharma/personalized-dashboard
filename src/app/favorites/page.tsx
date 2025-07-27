'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent, reorderItems } from '@/store/features/ContentSlice';
import { RootState, AppDispatch } from '@/store/store';
import ContentCard from '@/components/ContentCard';
import CardSkeleton from '@/components/CardSkelton';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { ref, inView } = useInView();

  // Get the new canLoadMore flag from the state
  const { items, favorites, status, page, error, canLoadMore } = useSelector((state: RootState) => state.content);
  const { selectedCategories } = useSelector((state: RootState) => state.preferences);
  const { searchTerm } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContent(1));
    }
  }, [dispatch, status]);

  // Updated effect that uses canLoadMore
  useEffect(() => {
    if (inView && status === 'succeeded' && canLoadMore) {
      dispatch(fetchContent(page));
    }
  }, [inView, dispatch, page, status, canLoadMore]);

  // ... (handleDragEnd and filteredContent logic is the same)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(reorderItems({ activeId: active.id as string, overId: over.id as string }));
    }
  };

  const filteredContent = items
    .filter(item => selectedCategories.includes(item.category))
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Unified Feed</h1>
        <SortableContext items={filteredContent.map(item => item.id)} strategy={rectSwappingStrategy}>
          
          {/* THIS IS THE PART THAT WAS MISSING. We render the grid and cards here. */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ContentCard {...item} isFavorite={favorites.includes(item.id)} />
                  </motion.div>
                ))
              ) : (
                // Show this message only if not loading
                status !== 'loading' && <p className="text-center text-gray-500 mt-8 col-span-full">No content found for your selected filters.</p>
              )}
            </AnimatePresence>
          </motion.div>

        </SortableContext>
        
        {/* The infinite scroll and loading section */}
        {canLoadMore ? (
          <div ref={ref}>
            {status === 'loading' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
              </div>
            )}
          </div>
        ) : (
          status !== 'loading' && <p className="text-center text-gray-500 my-8">You have reached the end!</p>
        )}
        
        {status === 'failed' && <p className="text-center text-red-500 my-8">Error: {error}</p>}
      </div>
    </DndContext>
  );
}