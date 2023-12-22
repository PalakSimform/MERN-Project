import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(()=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#0b3d91'
    },
    logo: {
        marginLeft: '15px',
    },
}));