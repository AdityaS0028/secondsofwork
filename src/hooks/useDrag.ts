import { useState, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  startPosition: Position;
  currentPosition: Position;
}

export function useDrag(
  onDrag: (deltaX: number, deltaY: number) => void,
  onDragEnd?: () => void
) {
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState>({
    isDragging: false,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 }
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragState.current = {
      isDragging: true,
      startPosition: { x: e.clientX, y: e.clientY },
      currentPosition: { x: e.clientX, y: e.clientY }
    };
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.isDragging) return;
    
    const deltaX = e.clientX - dragState.current.currentPosition.x;
    const deltaY = e.clientY - dragState.current.currentPosition.y;
    
    dragState.current.currentPosition = { x: e.clientX, y: e.clientY };
    onDrag(deltaX, deltaY);
  }, [onDrag]);

  const handleMouseUp = useCallback(() => {
    if (dragState.current.isDragging) {
      dragState.current.isDragging = false;
      setIsDragging(false);
      onDragEnd?.();
    }
  }, [onDragEnd]);

  return {
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp
    }
  };
}
