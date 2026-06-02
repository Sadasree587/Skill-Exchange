import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {

  return (

    <>
      <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >

        <Sidebar />

        <main
          style={{
            padding: "20px",
            width: "100%",
          }}
        >
          {children}
        </main>

      </div>

    </>

  );
}

export default DashboardLayout;