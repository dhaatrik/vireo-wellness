import { renderHook, act } from '@testing-library/react';
import { AppContextProvider, useAppContext } from './AppContext';
import { ReactNode } from 'react';

describe('AppContext - setWaterIntake', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AppContextProvider>{children}</AppContextProvider>
  );

  it('should set water intake to a positive value', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setWaterIntake(1500);
    });

    expect(result.current.waterIntake).toBe(1500);
  });

  it('should prevent negative water intake and set it to 0', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setWaterIntake(-500);
    });

    expect(result.current.waterIntake).toBe(0);
  });

  it('should correctly set water intake to exactly 0', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setWaterIntake(0);
    });

    expect(result.current.waterIntake).toBe(0);
  });
});

describe('useAppContext', () => {
  it('should throw an error when used outside of an AppContextProvider', () => {
    expect(() => renderHook(() => useAppContext())).toThrow(
      'useAppContext must be used within an AppContextProvider'
    );
  });
});
