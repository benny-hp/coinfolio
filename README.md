# CoinFolio

![sticky notes app](./public/coinfolio.png)

#### Top Technologies

[![React Badge](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)](#) [![Typescript Badge](https://img.shields.io/badge/-Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)](#) [![Next Badge](https://img.shields.io/badge/-NextJS-141414?style=for-the-badge&labelColor=black&logo=nextdotjs&logoColor=white)](#) [![Trpc Badge](https://img.shields.io/badge/-Trpc-2596be?style=for-the-badge&labelColor=black&logo=trpc&logoColor=2596be)](#) [![Nodejs Badge](https://img.shields.io/badge/-Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)](#) [![Prisma Badge](https://img.shields.io/badge/-prisma-2d3748?style=for-the-badge&labelColor=black&logo=prisma&logoColor=2d3748)](#) [![Postgres Badge](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&labelColor=black&logo=postgresql&logoColor=4169E1)](#)

Coin Folio is a full-stack cryptocurrency web application design to help users track their favorite coins and get a 7 days snapshot of the price. The app was build with next-auth, prisma, google provider for authentication, and trpc as a wrapper for serverless functions. The ui was build with tailwind for theming and dark and light mode.

## Installation

1. Download repository
   ```bash
   git clone https://github.com/Nomad-Freedom/sticky-notes-web.git
   ```
2. Install packages
   ```bash
   yarn install
   ```

## Run in Development

1. add env.local file in root directory

   ```env
    # Prisma

    DATABASE_URL=file:./db.sqlite

    # Next Auth

    NEXTAUTH_SECRET=<<some-secret>>
    NEXTAUTH_URL=http://localhost:3000

    # Next Auth Google Provider

    GOOGLE_CLIENT_ID=<<client-id>>
    GOOGLE_CLIENT_SECRET=<<secret>>
   ```

2. run application
   ```bash
   yarn run dev
   ```

<!-- TODO: Add last video link -->

#### :mailbox: Reach out to me!

- :paperclip: [My Resume/CV](https://github.com/Nomad-Freedom/Nomad-Freedom/blob/main/resume/resume.pdf)
- :email: inquiry@bennyhernandez.com
- :link: [bennyhernandez.com](https://www.bennyhernandez.com)
