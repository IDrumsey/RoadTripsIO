export interface DtoDataObject<DTO, Client> {
    toClient(): Client
    initFromData(data: DTO): void
}
