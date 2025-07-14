# Knowledgebase frontend application

---

### Docker

Build container

```bash
    docker build -t knowledgebase-front .
```

Run container

```bash
    docker run -p 3000:3000 knowledgebase-front
```

---

### Commands

Install dependencies

```bash
    yarn install
```

Start local development on http://localhost:3000 

```bash
    yarn dev
```

Build application

```bash
    yarn build 
```

Build application with analyze bundle

```bash
    yarn build:analyze
```

Start application. Need build app first.

```bash
    yarn start
```

---