import SignupAccount from "@/app/auth/signup/actions/signupAccount";
import prisma from "@/db";

const firstName = 'v';
const lastName = 'v';
const email = 'v@gmail.com';
const username = 'v';
const password = 'v';

const deleteUserV = async () => {
    await prisma.user.deleteMany({
        where: {
            email: email
        }
    });
}

test('User does not exist after deletion', async () => {
    // Arrange
    await deleteUserV();

    // Act
    const user = await prisma.user.findMany({
        where: {
            email: email
        }
    });

    // Assert
    expect(user).toEqual([]);
});

test('User exists after signing up', async () => {
    
});
