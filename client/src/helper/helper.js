export const capitalize = ( name ) => {
    let data = String( name ).toLowerCase()
    let result = String( data )[ 0 ].toUpperCase() + String( data ).slice( 1 )

    return result
}