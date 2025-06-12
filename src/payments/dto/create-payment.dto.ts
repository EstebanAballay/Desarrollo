//Aclaracion: Dto no puede tener id de su propia clase, solo los datos que son mandados por el cliente.
export class CreatePaymentDto {
    OrderId: number;
    amount: number;
    method: string;
    transactionDetails: {
        transactionId: string;
        paymentStatus: string;
    };
}