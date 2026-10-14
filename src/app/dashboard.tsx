import CardSaldo from "@/app/components/CardSaldo";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

interface Transacao {
    id: number;
    descricao: string;
    valor: string | number;
    tipo: 'receita' | 'despesa';
    categoria: string;
    data: string;
}

export default function App() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [saldo, setSaldo] = useState<number>(0);
    const [receitas, setReceitas] = useState<number>(0);
    const [despesas, setDespesas] = useState<number>(0);

    const API_URL = 'http://10.141.249.31:8000/api/transacao';

    function calcularTotais(dados: Transacao[]): void {
        let totalReceita = 0;
        let totalDespesa = 0;

        dados.forEach((item) =>{
            const valorNumerico = typeof item.valor === 'number' ? item.valor : parseFloat(item.valor);
            if (item.tipo === 'receita') {
                totalReceita += valorNumerico;
            } else {
                totalDespesa += valorNumerico;
            }
         });
         
         setReceitas(totalReceita);
         setDespesas(totalDespesa);
         setSaldo(totalReceita - totalDespesa);
    
       }

        async function carregarTransacoes(): Promise<void>{
            try {
                setCarregando(true);
                const resposta = await fetch(API_URL);
                const dados:Transacao[] = await resposta.json();
                setTransacoes(dados);
                calcularTotais(dados);
            } catch (erro) {
                console.log ("Erro ao carregar lançamentos:", erro);
            } finally {
                setCarregando(false);
            }
        }

        useEffect(() => {
            carregarTransacoes();
        }, []);



        return (
        <View style = {styles.container}>
            
                <View style={styles.cardSaldo}>
                    <Text style={styles.labelSaldo}>Saldo Total</Text>
                    <Text style={styles.valorSaldo}>R$ {saldo.toFixed(2)}</Text>
                    </View>

                    <View style={styles.row}>
                        <CardSaldo titulo="Receitas" valor={`R$ ${receitas.toFixed(2)}`} corFundo="#aa75ff" />
                        <CardSaldo titulo="Despesas" valor={`R$ ${despesas.toFixed(2)}`} corFundo="#f749a0" />
                    </View>

                    <Text style={styles.tituloExtrato}>Extrato Financeiro</Text>

                    {carregando ? (<ActivityIndicator size="large" color="#8c00ff" />) : (
                        <FlatList
                        data={transacoes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.itemCard}>
                                <View>
                                <Text style={styles.descricao}>{item.descricao}</Text>
                                <Text style={styles.categoria}>{item.categoria} - {item.data}</Text>
                                </View>
                                <Text style={item.tipo === 'receita' ? styles.valorReceita : styles.valorDespesa}>
                                    {item.tipo === 'receita' ? '+' : '-'} R$ {(typeof item.valor === 'number' ? item.valor : parseFloat(item.valor)).toFixed(2)}
                                </Text>
                                </View>



                                
                        )}
                        />
                    )}
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex:1, backgroundColor: '#160223', padding: 20, paddingTop:50},
    cardSaldo: {backgroundColor: '#400766', padding:20, borderRadius:12, marginBottom:15},
    labelSaldo: {color:'#fff', fontSize:16},
    valorSaldo: {color: '#fff', fontSize:28, fontWeight:'bold', marginTop:5},
    row: {flexDirection: 'row', justifyContent:'space-between', gap:12, marginBottom:20},
    tituloExtrato: {color:'#fff', fontSize:18, fontWeight:'bold', marginBottom:20},
    itemCard: {backgroundColor:'#4f008f', padding:15, borderRadius:8, marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems: 'center'},
    descricao: {color: '#fff', fontSize:16, fontWeight:'bold'},
    categoria: { color: '#a0a0a0', fontSize: 12, marginTop: 4 },
    valorReceita: { color: '#aa75ff', fontSize: 16, fontWeight: 'bold' },
    valorDespesa: { color: '#f749a0', fontSize: 16, fontWeight: 'bold' }
})