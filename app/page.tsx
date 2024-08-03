"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { Search, TrendingUp, Assessment, Close } from "@mui/icons-material";
import Link from "next/link";

const HomePage = () => {
  const [showChatBubble, setShowChatBubble] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" className="bg-white text-gray-800">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AdService
          </Typography>
          <Link href="/login">
            <Button color="inherit">ログイン</Button>
          </Link>
          <Link href="/register">
            <Button color="primary" variant="contained" className="ml-2">
              今すぐはじめる
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="mt-16 text-black">
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
            <div className="flex justify-center ">
              <Link href="/register">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mr-2"
                >
                  今すぐはじめる
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "primary" }}
                  size="large"
                  className="text-blue-500"
                >
                  無料で相談する
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="flex items-center justify-center"
          >
            <img src="" alt="広告のイメージ" className="rounded-lg shadow-lg" />
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

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "end",
        }}
      >
        {showChatBubble && (
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              padding: "8px 16px",
              borderRadius: "16px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "8px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            チャットで相談
            <IconButton
              size="small"
              onClick={() => setShowChatBubble(false)}
              sx={{ marginLeft: 1 }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        )}
        <Button>
          <Image src="" alt="ヘルプ" width={50} height={50} />
        </Button>
      </Box>
    </div>
  );
};

export default HomePage;
