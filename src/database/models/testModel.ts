import Account from './Account';
import User from './User';

(async () => {
  const user = await User.findOne({
    where: { accountId: 2 },
    include: [
      { model: Account, as: 'account', attributes: { exclude: ['accountId'] } },
    ],
  });
  console.log(user);
  process.exit(0);
})();
