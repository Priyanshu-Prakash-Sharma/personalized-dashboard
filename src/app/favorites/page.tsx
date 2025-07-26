'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { reorderItems } from '@/store/features/ContentSlice'; // Make sure the filename is correct
import ContentCard from '@/components/ContentCard';
import Link from 'next/link';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Get the full list of items and the array of favorite IDs from the store
  const { items, favorites } = useSelector((state: RootState) => state.content);

  // This is the crucial logic: filter the main list to get only favorited items
  const favoriteItems = items.filter(item => favorites.includes(item.id));
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Note: Reordering on the favorites page will affect the main feed's order.
      // This is expected behavior for this implementation.
      dispatch(reorderItems({ activeId: active.id as string, overId: over.id as string }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Favorites</h1>
          {favoriteItems.length > 0 ? (
            <SortableContext items={favoriteItems.map(item => item.id)} strategy={rectSwappingStrategy}>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteItems.map((item) => (
                    <ContentCard
                    key={item.id}
                    {...item}
                    isFavorite={true} // It's always a favorite on this page
                    />
                ))}
                </motion.div>
            </SortableContext>
          ) : (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">You does not favorited any content yet.</p>
                <Link href="/" className="mt-4 inline-block text-blue-500 dark:text-blue-400 hover:underline">
                ← Back to your feed
                </Link>
            </div>
          )}
        </div>
    </DndContext>
  );
}