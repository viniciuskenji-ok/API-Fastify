import Fastify from 'fastify';
import { createBook } from './routes/createBook';
import { getBook } from './routes/getBook';
import { deleteBook } from './routes/deleteBook';
import { updateBook } from './routes/updateBook';

const app = Fastify();

app.register(createBook);
app.register(getBook);
app.register(deleteBook);
app.register(updateBook);

app.listen({port: 3000}).then(() => {
    console.log(`Server is running on port ${3000}`);      
})


