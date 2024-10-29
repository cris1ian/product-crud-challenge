export interface IServerRes<T = any> {
    message: string
    data?: T
}
