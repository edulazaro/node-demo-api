
/**
 * User controller
 */
class UserTransformer {

  transformMany = (users) => {
    const result = [];
    for (const key in users) {
      result[key] = this.transform(users[key]);
    }

    return result;
  }

  transform = (user) => {
    return {
      "id": user.id,
      "email": user.email,
      "givenName": user.givenName,
      "familyName": user.familyName,
      "created": user.created,
    };
  }
}

module.exports = UserTransformer;