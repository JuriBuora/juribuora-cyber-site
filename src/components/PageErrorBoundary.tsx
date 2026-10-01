import { Component, type ReactNode } from "react";

type State = { failed: boolean };

/** Last resort when a page cannot be shown: say so, instead of a blank screen. */
class PageErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div>
          <p className="font-mono text-sm text-muted-foreground">This page could not be loaded.</p>
          <p className="mt-2 text-sm text-muted-foreground">The site may have just been updated.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Reload the page
          </button>
        </div>
      </div>
    );
  }
}

export default PageErrorBoundary;
