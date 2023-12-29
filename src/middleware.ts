// import { authMiddleware } from '@clerk/nextjs';

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   publicRoutes: ['/'],
// });

import { authMiddleware } from '@clerk/nextjs';
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: [
    '/',
    '/api/webhook',
    '/tags/:id',
    '/tags',
    '/questions',
    '/question/:id',
    '/profile/:id',
    '/community',
  ],
  ignoredRoutes: ['/api/webhook', '/api/chatgpt'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
