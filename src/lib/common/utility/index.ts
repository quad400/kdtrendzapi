import { UserEntity } from 'src/res/user/entity/user.entity';

export const generateCode = async (user: UserEntity): Promise<UserEntity> => {
  const otpExpiration = new Date();

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10),
  );

  user.verification_code = code;
  user.verification_code_expires = expires;
  await user.save();
  return user;
};
