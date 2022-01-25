export function GameErrorComponent(proprs: { message: string }) {
  return (
    <div className="container m-4">
      <div className="row alert alert-danger">
        <div>
          <strong>Error</strong>
        </div>
        <div>{proprs.message}</div>
      </div>
    </div>
  );
}
