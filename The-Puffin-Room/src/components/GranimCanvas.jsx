import { useEffect } from 'react';
import Granim from 'granim';

function GranimCanvas() {
  useEffect(() => {
    const granimInstance = new Granim({
      element: '#granim-canvas',
      name: 'granim',
      opacity: [1, 1],
      states: {
        "default-state": {
          gradients: [
            ['#D0F9FC', '#FDEAE3'],
            ['#FFFFFF', '#FFFFFF'],
            ['#FFFFFF', '#FDF0DC']
          ]
        }
      }
    });

    // Cleanup function
    return () => {
      granimInstance.destroy();
    };
  }, []);

  return (
    <canvas id="granim-canvas"></canvas>
  );
}

export default GranimCanvas;
