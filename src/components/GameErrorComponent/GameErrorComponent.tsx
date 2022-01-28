export function GameErrorComponent(proprs: { message: string }) {
  return (
    <div className="row m-4 alert alert-danger">
      <strong>Error</strong>
      <div>{proprs.message}</div>
    </div>
  );
}
