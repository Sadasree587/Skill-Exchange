import DashboardLayout from "../layouts/DashboardLayout";

function Skills() {

  const loading = false;
  const error = "";

  if (loading) {

    return (

      <DashboardLayout>

        <h2 className="p-6 text-2xl font-bold">
          Loading Skills...
        </h2>

      </DashboardLayout>

    );
  }

  if (error) {

    return (

      <DashboardLayout>

        <h2 className="p-6 text-2xl font-bold text-red-500">
          {error}
        </h2>

      </DashboardLayout>

    );
  }

  return (

    <DashboardLayout>

      <div className="p-6">

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-4xl font-bold mb-4">
            Skills
          </h1>

          <p className="text-gray-600">
            Skills Management Module Coming Soon
          </p>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Skills;