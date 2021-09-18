export interface DtoDataObject<DTO, Client> {
    initFromData(data: DTO): void
    toClient(): Client
}
