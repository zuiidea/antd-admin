import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button, Result, Typography, theme, Flex, Collapse } from "antd";
import { reportError, ErrorSeverity } from "@/utils/errorReporter";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const componentStack = errorInfo.componentStack ?? undefined;
    reportError(error, ErrorSeverity.ERROR, { componentStack });
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }
      return (
        <DefaultErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  onReset,
}: {
  error: Error;
  onReset: () => void;
}) {
  const { token } = theme.useToken();

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "60vh",
        padding: token.paddingLG,
      }}
    >
      <Result
        status="error"
        title="Something went wrong"
        subTitle={
          <Flex vertical gap={token.marginSM} style={{ maxWidth: 560 }}>
            <Typography.Text type="secondary">{error.message}</Typography.Text>
            <Collapse
              size="small"
              items={[
                {
                  key: "stack",
                  label: "Error details",
                  children: (
                    <Typography.Paragraph
                      code
                      style={{
                        fontSize: token.fontSizeSM,
                        maxHeight: 200,
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        margin: 0,
                      }}
                    >
                      {error.stack ?? error.message}
                    </Typography.Paragraph>
                  ),
                },
              ]}
            />
          </Flex>
        }
        extra={[
          <Button type="primary" key="retry" onClick={onReset}>
            Try again
          </Button>,
          <Button
            key="reload"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload page
          </Button>,
        ]}
      />
    </Flex>
  );
}
