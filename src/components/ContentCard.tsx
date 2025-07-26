'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '@/store/features/ContentSlice';
import { AppDispatch } from '@/store/store';
import { FiStar, FiGrid } from 'react-icons/fi'; // Import the Grid icon for the handle
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  url: string;
  isFavorite: boolean;
}

const ContentCard: React.FC<CardProps> = (props) => {
  const { id, title, description, imageUrl, url, isFavorite } = props;
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col transition-shadow hover:shadow-xl dark:border dark:border-gray-700">
      
      <div className="flex justify-between items-start mb-2">
        {/* The image is now inside this container */}
        {imageUrl && <img src={imageUrl} alt={title} className="rounded-md w-full h-40 object-cover bg-gray-200 dark:bg-gray-700" />}
      </div>
      
      <h3 className="text-lg font-bold mb-2 truncate text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-20 overflow-hidden">{description || "No description."}</p>
      
      <div className="mt-auto flex justify-between items-center">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 font-semibold">Read More →</a>
        <div className="flex items-center gap-3">
            <button onClick={() => dispatch(toggleFavorite(id))} title="Toggle Favorite">
              <FiStar className={`transition-colors ${isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} size={20} />
            </button>
            {/* THIS IS THE DRAG HANDLE. The drag listeners are now ONLY on this icon. */}
            <div {...attributes} {...listeners} className="cursor-grab touch-none p-1">
                 <FiGrid className="text-gray-400" />
            </div>
        </div>
      </div>
    </div>
  );
};
export default ContentCard;