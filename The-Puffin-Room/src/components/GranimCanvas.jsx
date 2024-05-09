import { useEffect, useContext} from 'react';
import Granim from 'granim';
import { ThemeContext } from '../contexts/ThemeContext';

function GranimCanvas() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const granimInstance = new Granim({
      element: '#granim-canvas',
      name: 'granim',
      opacity: [1, 1],
      states: {
        "default-state": {
          gradients: theme === 'light' ? [
            ['#D0F9FC', '#FDEAE3'],
            ['#FFFFFF', '#FFFFFF'],
            ['#FFFFFF', '#FDF0DC']
          ] : [
            ['#052B5F', '#212D40'],
            ['#0C1821', '#C54F64'],
            ['#151B25', '#222222']
          ]
        }
      }
    });


    return () => {
      granimInstance.destroy();
    };
  }, [theme]);

  return (
    <canvas id="granim-canvas"></canvas>
  );
}

export default GranimCanvas;
