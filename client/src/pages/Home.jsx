import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        Welcome to SkillSwap 🔄
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        A simple platform where people exchange skills and grow together. Create
        your profile, add your skills, and find others who can teach or learn
        with you.
      </p>

      {!user ? (
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      ) : (
        <Link
          to="/dashboard"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}

export default Home;
