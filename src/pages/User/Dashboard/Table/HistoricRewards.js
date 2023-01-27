import iconHistory1 from "../../../../assets/img/iconHistory-1.svg"
import iconHistory2 from "../../../../assets/img/iconHistory-2.svg"
import iconHistory3 from "../../../../assets/img/iconHistory-3.svg"
import iconHistory4 from "../../../../assets/img/iconHistory-4.svg"
import './HistoricRewards.css'
export default function HistoricRewards() {
    return (
            <><div className="__historicRewards">
            <h1>Historico de Recompensas</h1>
        </div><table className="__tableRewardsTitle">

                <td className="__titleRewards">Origem</td>
                <td className="__titleRewards">Tipo</td>
                <td className="__titleRewards">Data</td>
                <td className="__titleRewards">Valor</td>

            </table><table className="__tableRewards">
                <tr>
                    <td className="__originRewards">

                        <img src={iconHistory1} alt="" />
                        Tesco Market


                    </td>
                    <td className="__originRewards">

                        <img src={iconHistory2} alt="" />
                        ElectroMen Market

                    </td>
                    <td className="__originRewards">

                        <img src={iconHistory3} alt="" />
                        Fiorgio Restaurant

                    </td>
                    <td className="__originRewards">

                        <img src={iconHistory3} alt="" />
                        Fiorgio Restaurantx

                    </td>
                    <td className="__originRewards">

                        <img src={iconHistory4} alt="" />
                        Ann Marlin

                    </td>

                </tr>
                <tr>

                    <td className="__typeRewards">Marketplace</td>
                    <td className="__typeRewards">Food</td>
                    <td className="__typeRewards">Sport</td>
                    <td className="__typeRewards">Shopping</td>
                    <td className="__typeRewards">Shopping</td>

                </tr>
                <tr>


                    <td className="__dateRewards">15 Dec 2022</td>
                    <td className="__dateRewards">20 Jan 2023</td>
                    <td className="__dateRewards">30 Mar 2020</td>
                    <td className="__dateRewards">10 Apri 2023</td>
                    <td className="__dateRewards">02 Dec 2022</td>

                </tr>
                <tr>

                    <td className="__valueRewards">R$140.99</td>
                    <td className="__valueRewards">R$99.99</td>
                    <td className="__valueRewards">R$23.99</td>
                    <td className="__valueRewards">R$44.99</td>
                    <td className="__valueRewards">R$120.99</td>

                </tr>

            </table></>
    )
}