export const calculateMatchScore = (
  currentUser,
  otherUser
) => {

  if (
    !currentUser ||
    !otherUser
  ) {
    return 0;
  }

  const wanted =
    currentUser.skillsWanted || [];

  const offered =
    otherUser.skillsOffered || [];

  let score = 0;

  wanted.forEach((skill) => {

    if (
      offered.includes(skill)
    ) {

      score++;

    }

  });

  return score;

};

export const getSmartMatches = (
  currentUser,
  users = []
) => {

  if (
    !Array.isArray(users)
  ) {
    return [];
  }

  return users

    .map((user) => ({

      ...user,

      matchScore:
        calculateMatchScore(
          currentUser,
          user
        ),

    }))

    .sort(
      (a, b) =>
        b.matchScore -
        a.matchScore
    );

};