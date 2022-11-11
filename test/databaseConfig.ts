import { exec } from 'child_process';

export const tearUp = () => {
    return new Promise(function (resolve, reject) {
        exec("npx prisma migrate dev --name init", (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

export const tearDown = () => {
    return new Promise(function (resolve, reject) {
        exec("npm run database:reset", (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}