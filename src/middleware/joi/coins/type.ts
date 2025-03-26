import { Schema } from "joi";

// --------------------------------------------------------
// Coins joi validateion interface
// --------------------------------------------------------

interface CoinsJoi {
    coins: Schema;
}

// --------------------------
// Export CoinsJoi
// --------------------------
export default CoinsJoi;
