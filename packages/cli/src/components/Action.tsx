import { useAsync } from "react-async";
import { useState, useEffect, useMemo } from "react";

import { AsyncComponents } from "./AsyncComponents";

import { emitter } from "@/lib";

/**
 * Props for the Action component.
 */
type ActionProps = {
  /**
   * Name of the action.
   */
  name: string;
};

/**
 * Type representing possible action types.
 */
type ActionType = {
  type: "running" | "success" | "error" | "warning";
  ctx?: string;
};

/**
 * Action component displays an action with its status and name.
 * @param props - Props for the Action component.
 * @returns The rendered Action component.
 */
export function Action({ name }: ActionProps): JSX.Element {
  /**
   * Asynchronously import esm ink and ink-spinner
   * @type {Object}
   * @property {Object} data - The data returned by useAsync hook.
   * @property {boolean} isPending - Boolean indicating whether the async operation is pending.
   */
  const { data, isPending } = useAsync({
    promiseFn: AsyncComponents,
  });

  /**
   * State to manage the current action type.
   * @type {React.State<ActionType>}
   */
  const [action, setAction] = useState<ActionType>({ type: "running" });

  /**
   * Event handler function to update action state.
   * @param {Object} e - Event object containing action details.
   */
  function handler(e: any): void {
    if (e.action === name) {
      setAction(e.actionType);
    }
  }

  useEffect(() => {
    // Subscribe to the 'action' event using emitter
    emitter.on("action", handler);

    // Unsubscribe from the 'action' event when component unmounts
    return () => {
      emitter.off("action", handler);
    };
  }, []);

  /**
   * Memoized color, title, and icon value based on the action type.
   * @type {string}
   */
  const color = useMemo(() => {
    if (action.type === "running") {
      return "#00FFFF";
    }

    if (action.type === "success") {
      return "green";
    }

    if (action.type === "warning") {
      return "yellow";
    }

    if (action.type === "error") {
      return "red";
    }

    return "white";
  }, [action.type]);

  if (!data || isPending) return <></>;

  const { Text, Spinner } = data;

  return (
    <Text color={color}>
      {action.type === "running" && <Spinner />}
      {action.type === "error" && "🛑"}
      {action.type === "success" && "✅"}
      {action.type === "warning" && "⚠️"}
      {"  "}
      {name}
    </Text>
  );
}