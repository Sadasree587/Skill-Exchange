function MatchCard({

  user,

}) {

  return (

    <div

  className={`

    bg-white

    rounded-xl

    shadow-md

    p-6

    hover:shadow-xl

    transition-all

    border-2

    ${

      user.matchScore >= 100

      ? "border-green-500"

      : user.matchScore >= 50

      ? "border-yellow-500"

      : "border-gray-300"

    }

  `}

>

      <div className="flex justify-between items-center mb-4">

        <div className="flex items-center gap-3">

          <div
            className="
            w-14
            h-14
            rounded-full
            bg-gray-300
            flex
            items-center
            justify-center
          "
          >
            👤
          </div>

          <div>

            <h2 className="text-xl font-bold">

              {user.name}

            </h2>

            <p className="text-gray-500">

              {user.location ||
                "Unknown"}

            </p>

          </div>

        </div>

        <div>

  {

    user.matchScore >= 100 ? (

      <span
        className="
        bg-green-100
        text-green-700
        px-4
        py-2
        rounded-full
        font-bold
      "
      >
        🏆 Perfect Match
      </span>

    ) : user.matchScore >= 50 ? (

      <span
        className="
        bg-yellow-100
        text-yellow-700
        px-4
        py-2
        rounded-full
        font-bold
      "
      >
        ⭐ Great Match
      </span>

    ) : (

      <span
        className="
        bg-gray-100
        text-gray-700
        px-4
        py-2
        rounded-full
        font-bold
      "
      >
        ✨ Partial Match
      </span>

    )

  }

<p className="text-sm font-semibold mt-3 mb-4">

      Match Score:
      {" "}
      {user.matchScore}%

    </p>

</div>

      </div>

      <p className="mb-4 text-gray-700">

        {user.bio ||
          "No Bio Available"}

      </p>

      <div className="mb-4">

        <h3 className="font-semibold mb-2">

          Skills Offered

        </h3>

        <div className="flex flex-wrap gap-2">

          {user.skillsOffered?.map(
            (skill) => (

              <span
                key={skill}
                className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-sm
              "
              >
                {skill}
              </span>

            )
          )}

        </div>

      </div>

      <div className="mb-4">

        <h3 className="font-semibold mb-2">

          Skills Wanted

        </h3>

        <div className="flex flex-wrap gap-2">

          {user.skillsWanted?.map(
            (skill) => (

              <span
                key={skill}
                className="
                bg-green-100
                text-green-700
                px-3
                py-1
                rounded-full
                text-sm
              "
              >
                {skill}
              </span>

            )
          )}

        </div>

      </div>

      <button
        className="
        w-full
        bg-blue-500
        text-white
        py-2
        rounded-lg
        hover:bg-blue-600
      "
      >
        Send Swap Request
      </button>

    </div>

  );

}

export default MatchCard;