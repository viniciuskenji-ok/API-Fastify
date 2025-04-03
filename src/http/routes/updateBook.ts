import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export function updateBook(app: FastifyInstance) {
    app.patch('/book/:bookId', async (request, reply) => {
        const getBookParam = z.object({
            bookId: z.string().uuid(),
        });

        const getBookBody = z.object({
            isFavorite: z.boolean(),
            isReading: z.boolean(),
            isFinished: z.boolean(),
        })

        const { bookId } = getBookParam.parse(request.params);
        const { isFavorite, isReading, isFinished } = getBookBody.parse(request.body);

        const book = await prisma.book.findUnique({
            where: {
                id: bookId,
            }
        })

        if(!book){
            return reply.status(404).send({message: 'Book not found'});
        }
        await prisma.book.update({
            where: {        
                id: bookId,
            },
            data: {
                isFavorite: isFavorite || book?.isFavorite,
                isReading: isReading || book?.isReading,
                isFinished: isFinished || book?.isFinished, 
            }
        })
        return reply.status(200).send({message: 'Book updated'});
    })
}
