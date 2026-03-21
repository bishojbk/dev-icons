import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { DevIconContextValue } from './types';

const DevIconContext = createContext<DevIconContextValue>({});

export interface DevIconProviderProps extends DevIconContextValue {
  children: ReactNode;
}

/**
 * Provide global defaults for all DevIcon components within the tree.
 *
 * @example
 * ```tsx
 * <DevIconProvider size="lg" color="#333">
 *   <ReactIcon />
 *   <TypeScriptIcon />
 * </DevIconProvider>
 * ```
 */
export function DevIconProvider({ children, ...values }: DevIconProviderProps) {
  return (
    <DevIconContext.Provider value={values}>
      {children}
    </DevIconContext.Provider>
  );
}

/** Access the current DevIcon context values */
export function useDevIconContext(): DevIconContextValue {
  return useContext(DevIconContext);
}
