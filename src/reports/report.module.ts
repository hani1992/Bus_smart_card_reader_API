import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ReportsService } from "./reports.service";


@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'report-mq-module',
                transport: Transport.RMQ,
                options: {
                    urls: [
                        'amqps://krtncefw:6-LUL4gD5OWawjPo7rKFPOA_F43W2Qj8@beaver.rmq.cloudamqp.com/krtncefw',
                    ],
                    queue: 'rabbit-mq-nest-js',
                },
            },
        ]),
    ],
    controllers: [],
    providers: [ReportsService],
    exports: [ReportsService]
})

export class ReportsModule { }