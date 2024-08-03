import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Box,
  Fab,
} from "@mui/material";
import { Search, TrendingUp, Assessment } from "@mui/icons-material";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" className="bg-white text-gray-800">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AdService
          </Typography>
          <Button color="inherit">ログイン</Button>
          <Button color="primary" variant="contained" className="ml-2">
            無料で始める
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="mt-16">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" className="font-bold mb-4">
              効果的な広告で
              <br />
              ビジネスを成長させる
            </Typography>
            <Typography variant="h5" className="mb-6 text-gray-600">
              簡単な設定で、ターゲットに合わせた広告を配信
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="メールアドレスを入力"
              className="mb-4"
            />
            <Button variant="contained" color="primary" size="large" fullWidth>
              無料トライアルを開始
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="flex items-center justify-center"
          >
            <img
              src="/api/placeholder/500/300"
              alt="広告のイメージ"
              className="rounded-lg shadow-lg"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} className="mt-16">
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent className="text-center">
                <Search className="text-5xl mb-4 text-blue-500" />
                <Typography variant="h5" component="h2" className="mb-2">
                  効果的なターゲティング
                </Typography>
                <Typography color="textSecondary">
                  適切な顧客にリーチし、広告効果を最大化
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent className="text-center">
                <TrendingUp className="text-5xl mb-4 text-green-500" />
                <Typography variant="h5" component="h2" className="mb-2">
                  パフォーマンス分析
                </Typography>
                <Typography color="textSecondary">
                  リアルタイムでキャンペーンの成果を追跡
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent className="text-center">
                <Assessment className="text-5xl mb-4 text-purple-500" />
                <Typography variant="h5" component="h2" className="mb-2">
                  柔軟な予算設定
                </Typography>
                <Typography color="textSecondary">
                  ビジネスの規模に合わせて予算をカスタマイズ
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2024 AdService. All rights reserved.
          </Typography>
        </Container>
      </footer>

    </div>
  );
};

export default HomePage;
