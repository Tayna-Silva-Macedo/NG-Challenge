const userCreated = {
  id: 1,
  username: 'taynasm',
  password: '$2a$10$6D9oGkZNGgMHSL/tJoXdoeWt9OxOJHpzUjR5WS0W1HFbOeCtTDxOm',
  accountId: 1,
};

const userFind = {
  id: 1,
  username: 'taynasm',
  password: '$2a$10$6D9oGkZNGgMHSL/tJoXdoeWt9OxOJHpzUjR5WS0W1HFbOeCtTDxOm',
  accountId: 1,
};

const createUserInvalidUsername = {
  username: 'ta',
  password: '1234567AbC',
};

const createUserInvalidPassword = {
  username: 'taynasm',
  password: '123',
};

const createUserValid = {
  username: 'taynasm',
  password: '1234567AbC',
};

export {
  userCreated,
	userFind,
  createUserInvalidUsername,
  createUserInvalidPassword,
  createUserValid,
};
