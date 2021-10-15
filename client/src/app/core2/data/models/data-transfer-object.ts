export interface DataTransferObject<DTO, Client> {
    init(data: DTO): void
    toClient(): Client
}
