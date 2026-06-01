import React, { Component } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("🔥 Error caught:", error);
    console.error("📌 Stack:", info.componentStack);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "red" }}>
          <h2>Something went wrong</h2>

          <p>{this.state.error?.message}</p>

          <button onClick={this.handleReset}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;