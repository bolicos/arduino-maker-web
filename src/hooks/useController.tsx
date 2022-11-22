import BffController from '#/controllers/bff';
import { Board } from '#/models/boards';
import { Block } from '#/models/blocks';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  setLoading: (value: boolean) => void;
};

export function useController(props: Props) {
  const ref = useRef(true);
  const [actuators, setActuators] = useState<Array<Block>>();
  const [sensors, setSensors] = useState<Array<Block>>();
  const [boards, setBoards] = useState<Array<Board>>();
  const [fixed, setFixed] = useState<Array<Block>>();

  const frutas = useCallback(async () => {
    props.setLoading(true);
    const frutas1 = await BffController.getActuators();
    const frutas2 = await BffController.getSensors();
    const frutas3 = await BffController.getBoards();
    const frutas4 = await BffController.getFixed();

    setActuators(frutas1.data);
    setSensors(frutas2.data);
    setBoards(frutas3.data);
    setFixed(frutas4.data);

    props.setLoading(false);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current = false;

    frutas();
  }, [frutas]);

  return [boards, actuators, sensors, fixed];
}
