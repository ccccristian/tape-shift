export default function InputFile({handleFileChange} : {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}){
    return(
        <input type="file" onChange={handleFileChange}/>
    )
}