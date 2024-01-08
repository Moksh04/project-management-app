export default function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      {/* role is for seo */}
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
