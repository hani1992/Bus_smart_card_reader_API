import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";


@Injectable()
export class ReportsService {
    constructor(@Inject('report-mq-module') private readonly client: ClientProxy) { }

    public send(pattern: string, data: any) {
        return this.client.send(pattern, data).toPromise();
    }
}