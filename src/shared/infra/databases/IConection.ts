
interface IConection {
    connect (): Promise<void>
    disconnect(): Promise<void>
}

export default IConection