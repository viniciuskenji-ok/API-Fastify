import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export function deleteBook(app: FastifyInstance){
    app.delete('/book/:bookId', async (request, reply) =>{
        const getBookId  =  z.object({
            bookId: z.string().uuid(),
    })
    const { bookId } = getBookId.parse(request.params)

    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
        }
    })
    if(!book){
        return reply.status(404).send({message: 'Book not found'})
    }

    const deleteBook = await prisma.book.delete({
        where: {    
            id: bookId,
        }
    })

    if(!deleteBook){
        return reply.status(400).send({message: 'Book not deleted'})
    }

    return reply.code(204).send({message: 'Book deleted'})
})
}