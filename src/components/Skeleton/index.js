import React from "react";

function Skeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div
            style={{ width: 100, height: 20, marginBottom: 14 }}
            className="skeleton"
          >
            &nbsp;
          </div>
          <div style={{ width: "100%", height: 40 }} className="skeleton">
            &nbsp;
          </div>
        </div>
      ))}
    </>
  );
}

export default Skeleton;
