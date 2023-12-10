
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Button, CircularProgress } from "@/components/mui";
import Paragraph from "@/components/Paragraph";

//Spinner
const LoadingView = () => <CircularProgress />;

// Error + retry
const ErrorView = ({ error, resetErrorBoundary }) => {

  return (
    <div>
      <div>
        <Paragraph>{error.message}</Paragraph>
      </div>
      <Button variant={"contained"} onClick={() => resetErrorBoundary()}>
        Try again
      </Button>
    </div>
  );
};

export const QueryBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div>
      <ErrorBoundary fallbackCompnent={ErrorView} onReset={reset}>
        <Suspense fallback={<LoadingView />}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default QueryBoundary;