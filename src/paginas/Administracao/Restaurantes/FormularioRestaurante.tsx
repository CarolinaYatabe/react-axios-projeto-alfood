import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante atualizado com sucesso')
                })
        } else {
            http.post('restaurantes/', { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso')
                })
        }
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ marginTop: 1 }}>
                <Paper sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItens: 'center', flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                        <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomeRestaurante}
                                onChange={evento => setNomeRestaurante(evento.target.value)}
                                label="Nome do restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />
                            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default FormularioRestaurante
