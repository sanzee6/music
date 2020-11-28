import {get, post} from './http'

import axios from 'axios'
// ============歌手相关================
// 查询歌手
export const getAllSinger = () => get(`singer/allSinger`)

// ============歌曲相关================
// 根据歌手id查询歌曲
export const songOfSingerId = (id) => get(`song/singer/detail?singerId=${id}`)
// 根据歌曲id查询歌曲对象
export const songOfSongId = (id) => get(`song/detail?songId=${id}`)
// 根据歌手名字模糊查询歌曲
export const likeSongOfName = (keywords) => get(`song/likeSongOfName?songName=${keywords}`)

// ============歌单相关================
// 查询歌单
export const getAllSongList = () => get(`songList/allSongList`)

// ============歌单的歌曲相关============
// 根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listSong/detail?songListId=${songListId}`)

// ============用户相关================
// 查询用户
export const getAllConsumer = () => get(`consumer/allConsumer`)
// 注册
export const SignUp = (params) => post(`/consumer/add`, params)
// 登录
export const loginIn = (params) => post(`/consumer/login`, params)

// 下载音乐
export const download = (url) => axios({
  method: 'get',
  url: url,
  responseType: 'blob'
})
